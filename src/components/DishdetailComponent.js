import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle } from 'reactstrap';


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

    function RenderDetail({comments}) {
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
                        <RenderDish dish={props.dish} />
                        <RenderDetail comments={props.dish.comments} />
                    </div>
                </div>
            );
        }
        else {
            return (
                <div></div>
            );
        }
    }

export default DishDetail