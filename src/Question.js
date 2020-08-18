import React, { Component } from 'react';
import './question.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//does nothing
let question;

//This was just a test function to make sure the async returned
//what I wanted it to
async function test1() {
    try {
        const resp = await fetch('http://jservice.io/api/random');
        const data = await resp.json();
        console.log(data);
        console.log("Question value: ", data[0]['value']);
        console.log("The answer is: ", data[0]['answer']);
        console.log("Here is the question: ", data[0]['question']);
        question = data[0]['question']
    } catch (err) {
        console.log(err);
    }

}

let displayAnswer = false;

const clickToShowAnswer = () => {
    displayAnswer = !displayAnswer

}

// function Question() {
//     const [displayAnswer]
// }


class Question extends Component {
    constructor() {
        super();
        this.state = {
        data: [],
        display: 'transparent'
    };
        //binds the handleClick function to state
        this.handleClick = this.handleClick.bind(this)
    }

    //changes the color of the h4 element when clicked
    handleClick = () => {
        const changeClass = this.state.display == 'transparent' ?  'red' : 'transparent';
        this.setState({ display: changeClass });
    }

    //after component renders async function is run so info can be displayed
    async componentDidMount() {
        const resp = await fetch('http://jservice.io/api/random');
        const json = await resp.json();
        this.setState({ data: json });
    }


    render() {
        return (
            <div className="tc">
                {this.state.data.map(el => (
                    <div className="tc bg-light-green dib br3 pa3 ma2 grow bw2 shadow-5" onClick={clickToShowAnswer()}>
                        <h1 className="ttc">{el.category.title}</h1>
                        <h2>For {el.value}</h2>
                        <h2>{el.question}</h2>
                        <p>Click down here to show answer <FontAwesomeIcon icon="arrow-down" /></p>
                        <div className='poop'
                        style={{color: this.state.display}}
                            onClick= {this.handleClick}
                            >
                            <h3> Who is {el.answer} </h3>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

// class QuestionChild extends Component {
//     render() {
//     return (
//       <div
//         className={ this.props.className }
//         onClick={ this.props.toggleClassName }
//       >
//         { this.props.children }
//       </div>
//     )
//   }
// }

export default Question;
