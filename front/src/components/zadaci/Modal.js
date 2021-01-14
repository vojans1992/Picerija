import React from "react"
import {Button, Modal} from "react-bootstrap"

class ModalPoruci extends React.Component {
    constructor(props){
        super(props);

        this.state = {

        };
    }


    render(){
        return (
            <div>
                <Modal.Dialog>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal title</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>Modal body text goes here.</p>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary">Close</Button>
                        <Button variant="primary">Save changes</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        )
    }
}
export default ModalPoruci;