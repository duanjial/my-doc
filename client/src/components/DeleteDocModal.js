import { React, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

export default function DeleteDocModal() {
    const { toggleDeleteDocModal, deleteDocument, deleteDocId, deleteDocName } = useContext(GlobalContext);

    const handleDelete = () => {
        deleteDocument(deleteDocId);
        toggleDeleteDocModal();
    };

    const handleClose = () => {
        toggleDeleteDocModal();
    };
    
    return (
        <div className="modal">
            <div className="modal-dialog" role="document">
                <div className="modal-content delete-modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Delete Document {deleteDocName} ?</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => handleClose()}>
                            <span aria-hidden="true"></span>
                        </button>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={(e) => handleDelete()}>Delete</button>
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => handleClose()}>Cancle</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
