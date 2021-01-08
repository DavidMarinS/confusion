import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle } from 'reactstrap';


class DishDetail extends Component {
    constructor(props) {
        super(props);
    }

    renderDish(dish) {
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

    renderDetail(comments) {
        if (comments != null) {
            const dish_comment = comments.map(single_comment => {
                return (
                    <li key={single_comment.id}>
                        <p>{single_comment.comment}</p>
                        <p>{single_comment.author}, {single_comment.date}</p>
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

    render() {
        const dish = this.props.dish
        if(dish != null){
            const dish_selected = this.renderDish(dish)
            const dish_selected_comment = this.renderDetail(dish.comments)
            return (
                <div className='row'>
                    {dish_selected}
                    {dish_selected_comment}
                </div>
            )
        }
        else {
            return (
                <div></div>
            )
        }
    }

    
}

export default DishDetail