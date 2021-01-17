import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, Button, CardTitle, 
    Breadcrumb, BreadcrumbItem, Row, Col, Label,
    Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';



function RenderDish({dish}) {
    if (dish != null)
        return(
            <div className="col-12  col-md-5  m-1">
                <Card>
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
                </Card>
            </div>
        );
    else
        return(
            <div></div>
        );
}

function RenderDetail({comments, addComment, dishId}) {
    if (comments != null) {
        const dish_comment = comments.map(single_comment => {
            return (
                <li key={single_comment.id}>
                    <p>{single_comment.comment}</p>
                    <p>{single_comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(single_comment.date)))}</p>
                </li>
            )
        })
        return (
            <div className='col-12 col-md-5 m-1'>
                <h4>Comments</h4>
                <ul className='list-unstyled'>{dish_comment}</ul>
                <CommentForm dishId={dishId} addComment={addComment} />
            </div>
        )
    }
    else {
        return (
            <div></div>
        )
    }
}

const DishDetail = props => {
    if (props.dish) {
        return (
            <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>                
            </div>
            <div className="row">
                    <RenderDish dish={props.dish} />
                    <RenderDetail comments={props.comments} 
                        addComment={props.addComment}
                        dishId={props.dish.id}/>
            </div>
            </div>
        );
    }
}

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length < len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
    }

    render() {
        return(
            <div>
               <Button className="bg-white text-dark" onClick={this.toggleModal}>
               <i className="fa fa-pencil fa-lg"></i> Send Comments
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label for="rating" md={12}>rating</Label>
                                <Col md={12}>
                                    <Control.select model=".rating" name="rating" className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author" md={12}>Your Name</Label>
                                <Col md={12}>
                                <Control.text model=".author" id="author" name="author" 
                                    placeholder="Author" 
                                    className="form-control" 
                                    validators={{
                                        required,
                                        minLength: minLength(3),
                                        maxLength: maxLength(15)
                                    }} 
                                />
                                <Errors className="text-danger" model=".author" show="touched"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Should have more than 3 Characters',
                                        maxLength: 'Should have 15 or less Characters'
                                    }}
                                />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="feedback" md={12}>Comment</Label>
                                <Col md={12}>
                                <Control.text model=".comment" id="comment" name="comment" 
                                    resize="none"
                                    rows="12" 
                                    className="form-control" 
                                    validators={{
                                        required,
                                    }} 
                                />
                                <Errors className="text-danger" model=".comment" show="touched"
                                    messages={{
                                        required: 'Required'
                                    }}
                                />
                                </Col>
                            </Row>
                            <Button type="submit" value="submit" color="primary">Submit</Button>                            
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }


        
}

export default DishDetail