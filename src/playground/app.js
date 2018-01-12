// React Components are just es6 classes extended with React.Component

class IndecisionApp extends React.Component {
    constructor(props) {
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
        this.state = {
            options: []
        }
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
    // when component gets removed from the screen (i.e. removing it / changing pages)
    // componentWillUnmount() {
    //     console.log('componentWillUnmount!');
    // }
    handleDeleteOptions() {
        this.setState(() => ({ options: [] }));
    }
    handleDeleteOption(optionToRemove) {
        this.setState((prevState) => {
            return {
                options: prevState.options.filter((option) => optionToRemove !== option)
            }
        })
    }
    handlePick() {
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];
        alert(option);
    }
    handleAddOption(option) {
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
    }
    render() {
        const subtitle = 'Put your life in the hands of a computer';

        return (
            <div>
                <Header subtitle={subtitle} />
                <Action
                    hasOptions={this.state.options.length}
                    handlePick={this.handlePick}
                />
                <AddOption
                    handleAddOption={this.handleAddOption}
                />
                <Options
                    options={this.state.options}
                    handleDeleteOptions={this.handleDeleteOptions}
                    handleDeleteOption={this.handleDeleteOption}
                />
            </div>
        )
    }
};

const Header = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            {props.subtitle && <h2>{props.subtitle}</h2>}
        </div>
    );
}

Header.defaultProps = {
    title: 'Indecision'
}

const Action = (props) => {
    return (
        <div>
            <button
                onClick={props.handlePick}
                disabled={!props.hasOptions}
            >
                What should I do?
            </button>
        </div>
    );
};

const Options = (props) => {
    return (
        <div>
            <button onClick={props.handleDeleteOptions}>Remove All</button>
            {props.options.length === 0 && <p>Please add an option to get started!</p>}
            {
                props.options.map((option) => (
                    <Option
                        key={option}
                        optionText={option}
                        handleDeleteOption={props.handleDeleteOption}
                    />
                ))
            }
        </div>
    );
};

// props obj arg gets passed in up above as the "attributes" 
const Option = (props) => {
    return (
        <div>
            <button onClick={(e) => {
                props.handleDeleteOption(props.optionText);
            }}>
                x
        </button>
            {props.optionText}
        </div>
    );
}

// you need constructor for state and when using this
class AddOption extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            error: undefined
        };
    }

    handleAddOption(e) {
        e.preventDefault();

        const option = e.target.elements.option.value.trim();
        const error = this.props.handleAddOption(option);

        this.setState(() => ({ error }));

        if (!error) {
            e.target.elements.option.value = '';
        }
    }
    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.handleAddOption}>
                    <input type="text" name="option" autoFocus />
                    <button>Add Option</button>
                </form>
            </div>
        );
    }
};

// class based is this.props
// stateless function is just props 
// both use props
// only class based has state
// const User = (props) => {
//     return (
//         <div>
//             <p>Name: {props.name}</p>
//             <p>Age: {props.age}</p>
//         </div>
//     )
// }   

ReactDOM.render(<IndecisionApp options={['Devils Den', 'Second District']} />, document.getElementById('app'));