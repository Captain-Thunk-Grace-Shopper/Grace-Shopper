import React from 'react'
import {connect} from 'react-redux'
import {getSingleProduct} from '../store/products'

class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.getSingleProduct(this.props.paramId)
  }
  render() {
    const product = this.props.product
    return (
      <main>
        <div>
          <h2>{product.name}</h2>
          <img src={product.imgUrl} />
          <h3>Description:</h3>
          <p>{product.description}</p>
          <h4>Price:{product.price}</h4>
        </div>
      </main>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    paramId: ownProps.match.params.productId,
    product: state.products
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSingleProduct: id => dispatch(getSingleProduct(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)