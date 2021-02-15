const initialProductList = [];

function ProductRow(props) {
    const product = props.product;
    return (
        <tr>
            <td>{product.name}</td>
            <td>{product.price ? '$'+product.price : ''}</td>
            <td>{product.category}</td>
            <td>{product.image ? <a href={product.image} target="_blank">Link</a> : ''}</td>
        </tr>
    )
}

function ProductTable(props) {
    const productRows = props.products.map(product => <ProductRow key={product.id} product={product}/>);

    return(
        <table className="bordered-table">
            <thead>
                <tr>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Image</th>
                </tr>
            </thead>
            <tbody>
                {productRows.length > 0 ? productRows : <tr><td colSpan="4">No records to display</td></tr>}
            </tbody>
        </table>
    );
}

class ProductAdd extends React.Component {
    constructor() {
        super();
        this.state = {value: '$'};
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handlePriceChange(e) {
        this.setState({value: e.target.value});
    }
    handleSubmit(e) {
        e.preventDefault();
        const form = document.forms.productAdd;
        const product = {
            category: form.productCategory.value,
            price: form.productPrice.value.substring(1),
            name: form.productname.value,
            image: form.productimage.value
        }
        this.props.createProduct(product);
        form.productCategory.value = "Shirts";
        this.setState({value: '$'});
        form.productname.value = "";
        form.productimage.value = "";
    }
    render() {
        return(
            <form name="productAdd" onSubmit={this.handleSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <td>Category</td>
                            <td>Price Per Unit</td>
                        </tr>
                        <tr>
                            <td>
                                <select id="productcategory" name="productCategory">
                                    <option value="Shirts">Shirts</option>
                                    <option value="Jeans">Jeans</option>
                                    <option value="Jackets">Jackets</option>
                                    <option value="Sweaters">Sweaters</option>
                                    <option value="Accessories">Accessories</option>
                                </select>
                            </td>
                            <td>
                                <input type="text" id="productprice" name="productPrice" value={this.state.value} onChange={this.handlePriceChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td>Product Name</td>
                            <td>Image URL</td>
                        </tr>
                        <tr>
                            <td><input type="text" name="productname" placeholder="Product Name"/></td>
                            <td><input type="text" name="productimage" placeholder="Image URL"/></td>
                        </tr>
                    </tbody>
                </table>
                <button>Add Product</button>
            </form>
        );
    }
}

class ProductList extends React.Component {
    constructor() {
        super();
        this.state = { products: [] };
        this.createProduct = this.createProduct.bind(this);
    }
    loadData() {
        setTimeout(() => {
            this.setState({ products: initialProductList });
        }, 500);
    }
    componentDidMount() {
        this.loadData();
    }
    createProduct(product) {
        product.id = this.state.products.length+1;
        const newProductList = this.state.products.slice();
        newProductList.push(product);
        this.setState({ products: newProductList });
    }
    render() {
        return(
            <React.Fragment>
                <h1>My Company Inventory</h1>
                Showing all available products
                <hr />
                <ProductTable products={this.state.products}/>
                <br />
                Add a new product to inventory
                <hr />
                <ProductAdd createProduct={this.createProduct}/>
            </React.Fragment>
        );
    }
}

const inventoryAppDiv = document.getElementById('inventory-app');
ReactDOM.render( <ProductList />, inventoryAppDiv);