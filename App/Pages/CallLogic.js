import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import TextField from "@material-ui/core/TextField"
import AssignmentIcon from "@material-ui/icons/Assignment"
import PhoneIcon from "@material-ui/icons/Phone"
import {CopyToClipboard} from "react-copy-to-clipboard"
import React, {useEffect, useRef, useState} from "react"
import Peer from "simple-peer"
import io from "socket.io-client"
import "./App.css"

const socket = io.connect("http://localhost:5000");

function App() {
  const [me, setMe] = useState("");
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState("");
  const [callEnded, setCallEnded] = useState(false);

  const [micro, setMicro] = useState(true);
  const [wasMicroEnabled, setWasMicroEnabled] = useState(true);
  const [sound, setSound] = useState(true);
  const [cam, setCam] = useState(true);

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({video: true, audio: true}).then((stream) => {
      setStream(stream);
      if (myVideo.current)
        myVideo.current.srcObject = stream;
    });

    socket.on("me", (id) => {
      setMe(id);
    });

    socket.on("callUser", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setCallerSignal(data.signal);
    });
  }, []);

  const callUser = (id) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream
    });

    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
      });
    });

    peer.on("stream", (stream) => {
      if (userVideo.current)
        userVideo.current.srcObject = stream;
    });

    socket.on("callEnded", () => {
      leaveCall();
    });

    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream
    });

    peer.on("signal", (data) => {
      socket.emit("answerCall", {signal: data, to: caller});
    });

    peer.on("stream", (stream) => {
      stream.getAudioTracks()[0].enabled = sound;
      if (userVideo.current)
        userVideo.current.srcObject = stream;
    });

    socket.on("callEnded", () => {
      leaveCall();
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    socket.disconnect();
//    connectionRef.current.destroy();
  };

  const muteMicro = () => {
    if (!sound) {
      muteSound();
      stream.getAudioTracks()[0].enabled = true;
      setMicro(true);
    } else {
      stream.getAudioTracks()[0].enabled = !micro;
      setMicro(!micro);
    }
  };

  const muteSound = () => {
    if (!sound && wasMicroEnabled) {
      stream.getAudioTracks()[0].enabled = true;
      if (userVideo.current)
        userVideo.current.srcObject.getAudioTracks()[0].enabled = true;
      setMicro(true);
    } else {
      if (userVideo.current)
        userVideo.current.srcObject.getAudioTracks()[0].enabled = false;
      stream.getAudioTracks()[0].enabled = false;
    }
    setWasMicroEnabled(micro);
    if (sound)
      setMicro(false);
    setSound(!sound);
  }

  const cutCam = () => {
    stream.getVideoTracks()[0].enabled = !cam;
    setCam(!cam);
  };

	return (
		<>
			<h1 style={{ textAlign: "center", color: '#fff' }}>SafeCall Audio</h1>
		<div className="container">
			<div className="video-container">
				<div className="video">
					{stream &&  <video playsInline muted ref={myVideo} autoPlay style={{ width: "300px" }} />}
				</div>
				<div className="video">
					{callAccepted && !callEnded ?
					<video playsInline ref={userVideo} autoPlay style={{ width: "300px"}} />:
					null}
				</div>
			</div>
			<div className="myId">
				<CopyToClipboard text={me} style={{ marginBottom: "2rem" }}>
					<Button variant="contained" color="primary" startIcon={<AssignmentIcon fontSize="large" />}>
						Copy ID
					</Button>
				</CopyToClipboard>

				<TextField
					id="filled-basic"
					label="ID to call"
					variant="filled"
					value={idToCall}
					onChange={(e) => setIdToCall(e.target.value)}
				/>
				<div className="call-button">
					{callAccepted && !callEnded ? (
						<Button variant="contained" color="secondary" onClick={leaveCall}>
							End Call
						</Button>
					) : (
						<IconButton color="primary" aria-label="call" onClick={() => callUser(idToCall)}>
							<PhoneIcon fontSize="large" />
						</IconButton>
					)}
				</div>
			</div>
			<div>
				{receivingCall && !callAccepted ? (
						<div className="caller">
						<h1 >Call received...</h1>
						<Button variant="contained" color="primary" onClick={answerCall}>
							Answer
						</Button>
					</div>
				) : null}
			</div>
		</div>
    <div>
      {micro ? (
        <Button variant="contained" color="primary" onClick={muteMicro}>
          Mute micro
        </Button>
      ) : (
        <Button variant="contained" color="secondary" onClick={muteMicro}>
          Unmute micro
        </Button>
      )}
    </div>
    <div>
      {sound ? (
        <Button variant="contained" color="primary" onClick={muteSound}>
          Mute sound
        </Button>
      ) : (
        <Button variant="contained" color="secondary" onClick={muteSound}>
          Unmute sound
        </Button>
      )}
    </div>
    <div>
      {!cam ? (
        <Button variant="contained" color="primary" onClick={cutCam}>
          Add cam
        </Button>
      ) : (
        <Button variant="contained" color="secondary" onClick={cutCam}>
          Remove cam
        </Button>
      )}
    </div>
		</>
	)
}

export default App;