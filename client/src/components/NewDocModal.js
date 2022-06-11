import { React, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";

const initialDocName = {"docName": ""};

export default function NewDocModal() {
    const history = useHistory();
    const [docName, setDocName] = useState(initialDocName);
    const [permission, setPermission] = useState("only you");
    const [selected, setSelected] = useState(1);

    const { createDocument, toggleNewDocModal } = useContext(GlobalContext);

    const handleChange = (e) => {
        setDocName({ ...docName, [e.target.name]: e.target.value });
      };
    
    const handleCreate = (e) => {
        e.preventDefault();
        createDocument(docName, history);
        toggleNewDocModal();
    };

    const handleClose = () => {
        toggleNewDocModal();
    };
    
    const onChange1 = (e) => {
        setPermission(e.target.value);
        setSelected(1);
    }
    
    const onChange2 = (e) => {
        setPermission(e.target.value);
        setSelected(2);
    }
  
    return (
        <div className="modal">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Create a New Document</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => handleClose()}>
                            <span aria-hidden="true"></span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="modal-form-group">
                            <label className="col-form-label" htmlFor="inputDefault">Name</label>
                            <input type="text" className="form-control" name="docName" placeholder="document name" id="docName" onChange={handleChange}/>
                        </div>
                        <fieldset className="form-group">
                            <legend className="mt-4">Who can access</legend>
                            <div className="form-check">
                                <label className="form-check-label">
                                    <input type="radio" className="form-check-input" name="optionsRadio" id="optionsRadios1" value="only you" checked={selected === 1} onChange={onChange1}/>
                                    Only you
                                </label>                               
                            </div>
                            <div className="form-check">
                                <label className="form-check-label">
                                    <input type="radio" className="form-check-input" name="optionsRadio" id="optionsRadios2" value="specific" checked={selected === 2} onChange={onChange2}/>
                                    Specific people
                                </label>
                            </div>
                        </fieldset>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={(e) => handleCreate(e)}>Create</button>
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => handleClose()}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
