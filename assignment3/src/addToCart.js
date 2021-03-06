import React from 'react'
import axios from 'axios'

const base_url = "https://8080-rose-boar-u6d1djgq.ws-us03.gitpod.io/"

export default class AddToCart extends React.Component {
    state = {
        flavours: [],
        toppings: [],
        sugars: [],
        product: {
            flavour: "",
            topping: [],
            sugar: ""
        },
        cart:[]
    }


    async componentDidMount() {
        let responseTopping = await axios.get(`${base_url}reactTopping`)
        let responseFlavour = await axios.get(`${base_url}reactFlavours`)
        let responseSugar = await axios.get(`${base_url}reactSugar`)
        this.setState({
            toppings: responseTopping.data,
            flavours: responseFlavour.data,
            sugars: responseSugar.data
        })
    
    }

    create = () => {
        let copy = [...this.state.cart]
        let modified = [...copy, this.state.product]
        this.setState({
            cart: modified,
             product: {
                ...this.state.product,
                flavour: "",
                sugar: "",
                topping:[]
            }
        })
    }

    updateFlavourField = (e) => {
        this.setState({
            product: {
                ...this.state.product,
                flavour: e.target.value
            }
        });
        console.log(this.state.product.flavour)
    };

    updateSugarField = (e) => {
        this.setState({
            product: {
                ...this.state.product,
                sugar: e.target.value
            }
        });
    };

    updateToppingField = (e) => {
        let originalTopping = this.state.product[e.target.name];
        if (!originalTopping.includes(e.target.value)) {
            let modified = [...originalTopping, e.target.value];
            this.setState({
                product: {
                    ...this.state.product,
                    [e.target.name]: modified
                }
            })
        } else {
            let modified = originalTopping.filter((eachItem) => {
                return eachItem !== e.target.value;
            })
            this.setState({
                product: {
                    ...this.state.product,
                    [e.target.name]: modified
                }
            })
        }
    }

    render() {

        const myStyle={
            textAlign: "center",
            marginTop:"50px"
        }
        return (
            <div>
                <div>
                    <h3>flavour</h3>
                    {this.state.flavours.map(f => (
                        <React.Fragment>
                            <input
                                type="radio"
                                value={f.id}
                                name="flavour"
                                checked={this.state.product.flavour == f.id}
                                onChange={this.updateFlavourField}
                            />
                            <label>{f.tea}</label>
                        </React.Fragment>
                    ))}
                </div>
                <div>
                    <h3>sugar level</h3>
                    {this.state.sugars.map(s => (
                        <React.Fragment>
                            <input
                                type="radio"
                                value={s.id}
                                name="sugar"
                                checked={this.state.product.sugar == s.id}
                                onChange={this.updateSugarField}
                            />
                            <label>{s.level}</label>
                        </React.Fragment>
                    ))}
                </div>
                <div>
                    <h3>topping</h3>
                    {this.state.toppings.map(t => (
                        <React.Fragment>
                            <input
                                type="checkbox"
                                value={t.id}
                                name="topping"
                                checked={this.state.product.topping.includes(t.id.toString())}
                                onChange={this.updateToppingField}
                            />
                            <label>{t.topping}</label>
                        </React.Fragment>
                    ))}
                </div>
                <button onClick={this.create}>add to cart</button>
            </div>
        )
    }

  
}