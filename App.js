import React from 'react';
import { Text, View, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { styles } from './src/Styles';


const ConversionTypeButton = ({
    to,
    from,
    toCurrency,
    fromCurrency,
    setConversionCurrencies
}) => {
    const isSelectedConversionType = fromCurrency === from && toCurrency === to;
    const backgroundColor = isSelectedConversionType ? 'lightblue' : null;
    const conditionalButtonStyle = { backgroundColor };

    const fromFlag = from === 'usd' ? 'USD' : 'VND';
    const toFlag = to === 'usd' ? 'USD' : 'VND';

    return (
        <TouchableOpacity
            style={[styles.button, conditionalButtonStyle]}
            onPress={() => setConversionCurrencies(from, to)}
        >
            <Text style={styles.buttonText}>
                {fromFlag} to {toFlag}
            </Text>
        </TouchableOpacity>
    );
};

const FormattedCurrency = props => {
    const format = props.type === 'usd' ? 'USD' : 'VND';
    const currency = props.type === 'usd' ? 'USD' : 'VND';
    const flag = props.type === 'usd' ? 'USD' : 'VND';

    const formatter = new Intl.NumberFormat(format, {
        currency,
        style: 'currency'
    });

    return (
        <Text style={styles.currencyText}>
            {formatter.format(props.value)} {flag}
        </Text>
    );
};


export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentCurrencyValue: 0,
            convertedCurrencyValue: 0,
            fromCurrency: 'vnd',
            toCurrency: 'usd'
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.instruction}>Please enter the value of the currency you want to convert</Text>
                <TextInput
                    autoFocus={true}
                    textAlign='center '
                    keyboardType='number-pad'
                    placeholder='100,000,000 VND'
                    selectionColor='red'
                    style={styles.input}
                    onChangeText = {(text) => {
                        this.setState({ currentCurrencyValue: text });
                        this.convertCurrency(text);
                    }}
                />
                <ConversionTypeButton
                    from='vnd' to='usd'
                    toCurrency={this.state.toCurrency}
                    fromCurrency={this.state.fromCurrency}
                    setConversionCurrencies={this.setConversionCurrencies}
                />
                <ConversionTypeButton
                    from='usd' to='vnd'
                    toCurrency={this.state.toCurrency}
                    fromCurrency={this.state.fromCurrency}
                    setConversionCurrencies={this.setConversionCurrencies}
                />
                <Text>Current currency:</Text>
                <Text style={styles.currencyText}>{this.state.currentCurrencyValue}</Text>
                {/* <FormattedCurrency
                    type={this.state.fromCurrency}
                    value={this.state.currentCurrencyValue}
                /> */}

                <Text>Converted currency:</Text>
                {/* <Text style={styles.currencyText}>{this.state.convertedCurrencyValue}</Text> */}
                <FormattedCurrency
                    type={this.state.toCurrency}
                    value={this.state.convertedCurrencyValue}
                />
            </SafeAreaView>
        );
    }

    convertCurrency = (currentCurrency) => {
        let value = (this.state.fromCurrency === 'vnd') ?
            currentCurrency / 23000
            : value = 23000 * currentCurrency;
        this.setState({
            currentCurrencyValue: currentCurrency,
            convertedCurrencyValue: value,
        });
    };

    setConversionCurrencies = (from, to) => {
        this.setState({
            fromCurrency: from,
            toCurrency: to
        })
    };
}