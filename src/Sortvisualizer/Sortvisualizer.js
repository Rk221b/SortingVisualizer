import React, { Component } from 'react';
import './Sortvisualizer.css';


class Sortvisualizer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            array: []
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    randomInt = (min, max) => {
        return (Math.floor(Math.random() * (max - min + 1) + min));
    };

    resetArray = () => {

        const array = []

        for (let i = 0; i < 20; i++) {
            array.push(this.randomInt(100, 600));
        }

        this.setState({
            array: array
        });
    };

    sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
      }


    selectElement = async (first, second, swapped, i) => {
            const element1 = first;
            const element2 = second;
            const swap = swapped;
            const bar1 = document.getElementById(element1);
            const bar2 = document.getElementById(element2);
            const color1 = '#0A79DF';
            const color2 = '#0A79DF';

            setTimeout(() => {
                bar1.style.backgroundColor = color1;
                bar2.style.backgroundColor = color2;
            }, i * 200);

            await this.sleep(200);

            if (swap) {
                setTimeout(() => {
                    const temp = bar1.style.height;
                    bar1.style.height = bar2.style.height;
                    bar2.style.height = temp;
                }, i * 200);
            }
            else{
                setTimeout(() => {
                    
                }, i * 200);
            }

            await this.sleep(200);

            setTimeout(() => {
                    bar1.style.backgroundColor = 'white';
                    bar2.style.backgroundColor = 'white';
                }, i * 208);
                await this.sleep(208);    
    }  

    bubbleSort = async (array) => {

        const len = array.length;

        const animation = [];
        let temp = 0;

        for (let i = 0; i < len - 1; i++) {
            for (let j = 0; j < len - i - 1; j++) {


                if (array[j] > array[j + 1]) {
                    temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;

                    animation.push({
                        "first": j,
                        "second": j + 1,
                        "swapped": true
                    });

                } else {
                    animation.push({
                        "first": j,
                        "second": j + 1,
                        "swapped": false
                    });
                }
            }
        }


        const animationLength = animation.length;

        for (let i = 0; i < animationLength; i++) {
           await this.selectElement(animation[i].first, animation[i].second, animation[i].swapped, i);
        }
    };

    render() {
        return ( 
            <div className = "visualization-wrapper" >
            <div className = "container" > {
                this.state.array.map((num, idx) => {
                    return ( 
                        <div className = "array-bar"
                        key = { idx }
                        id = { idx }
                        style = {
                            { height: `${num}px` }
                        } >

                        </div>
                    )
                })
            }
            </div> 
            <div >
            <button onClick = { this.resetArray } >
            Generate New Array </button> 
            <button onClick = {
                () => { this.bubbleSort(this.state.array) }
            } >
            Bubble Sort </button> 
            </div> 
            </div>    
        );
    }
}



export default Sortvisualizer;