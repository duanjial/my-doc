import { React, useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

const initialRecipient = {"recipient": ""};

export default function ShareDocModal() {
    const [recipient, setRecipient] = useState(initialRecipient);

    const { toggleShareDocModal, shareDocId, shareDocName, socket } = useContext(GlobalContext);

    const handleChange = (e) => {
        setRecipient({ ...recipient, [e.target.name]: e.target.value });
    };
    
    const handleShare = (e) => {
        e.preventDefault();
        const notification = {"doc_id": shareDocId, "sender": localStorage.getItem("userName"), "recipient": recipient.recipient};
        socket.emit("send-notification", notification);
        toggleShareDocModal();
    };

    const handleClose = () => {
        toggleShareDocModal();
    };
  
    return (
        <div className="modal">
            <div className="modal-dialog" role="document">
                <div className="modal-content share-modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            Sharing Document
                            <i className="fa-solid fa-file-lines doc-icon"></i>{shareDocName}
                        </h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => handleClose()}>
                            <span aria-hidden="true"></span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="modal-form-group">
                            <label className="col-form-label" htmlFor="inputDefault">To</label>
                            <input type="text" className="form-control" name="recipient" placeholder="Add an email" id="recipient" onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={(e) => handleShare(e)}>Share</button>
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => handleClose()}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
