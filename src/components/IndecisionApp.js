import React from 'react';

import AddOption from './AddOption';
import Header from './Header';
import Action from './Action';
import Options from './Options';
import OptionModal from './OptionModal';

class IndecisionApp extends React.Component {
    state = {
        options: [],
        selectedOption: undefined
    }
    // when component gets removed from the screen (i.e. removing it / changing pages)
    // componentWillUnmount() {
        //     console.log('componentWillUnmount!');
        // }
    handleDeleteOptions = () => {
        this.setState(() => ({ options: [] }));
    };
    handleDeleteOption = (optionToRemove) => {
        this.setState((prevState) => {
            return {
                options: prevState.options.filter((option) => optionToRemove !== option)
            }
        })
    };
    handlePick = () => {
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];
        console.log(option);
        this.setState(() => {
            return {
                selectedOption: option
            }
        });
    };
    handleAddOption = (option) => {
        // empty string
        if (!option) {
            return 'Enter valid value to add item.';
            // duplicate
        } else if (this.state.options.indexOf(option) > -1) {
            return 'This option already exists.'
        }
        
        // dont want to push because that changes the state
        // just want to give it the new value
        // concat gives a new array with the new value
        this.setState((prevState) => ({ options: prevState.options.concat(option) }));
    };
    handleClearSelectedOption = () => {
        this.setState(() => {
            return {
                selectedOption: undefined
            }
        });
    }
    // when component is mounted to the screen
    componentDidMount() {
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);

            if (options) {
                this.setState((prevState) => ({ options }));
            }
        } catch (e) {
            console.log(e);
        }
    }
    // state or props change
    componentDidUpdate(prevProps, prevState) {
        if (prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
            console.log('saving data');
        }
    }
    render() {
        const subtitle = 'Put your life in the hands of a computer';
        
        return (
            <div>
            <Header subtitle={subtitle} />
            <div className="container">
                <Action
                hasOptions={this.state.options.length}
                handlePick={this.handlePick}
                />
                <div className="widget">
                    <Options
                    options={this.state.options}
                    handleDeleteOptions={this.handleDeleteOptions}
                    handleDeleteOption={this.handleDeleteOption}
                    />
                    <AddOption
                    handleAddOption={this.handleAddOption}
                    />
                </div>
            </div>
            <OptionModal 
                selectedOption={this.state.selectedOption}
                handleClearSelectedOption={this.handleClearSelectedOption}
            />
            </div>
        )
    }
};

export default IndecisionApp;
