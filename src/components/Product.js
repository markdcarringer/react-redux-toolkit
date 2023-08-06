import { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../store/cartSlice';
import { getProducts } from '../store/productSlice';
import StatusCode from '../utils/StatusCode';

const Product = () => {

    const dispatch = useDispatch();
    const { data: products, status } = useSelector(state => state.products);

    useEffect(() => {
        dispatch(getProducts())
    }, []);

    if (status === StatusCode.LOADING) {
        return <Alert>Loading...</Alert>
    }

    if (status === StatusCode.ERROR) {
        return <Alert key="danger" variant="danger">
            Something went wrong! Try again later.
        </Alert>
    }

    const addToCart = (product) => {
        // Dispatch an add action.
        dispatch(add(product));
    }

    const cards = products.map(product =>
        <div key={product.id} className="col-md-3" style={{ marginBottom: "10px" }}>
            <Card className="h-100" style={{ width: '18rem' }}>
                <div className="text-center">
                    <Card.Img variant="top" src={product.image} style={{ width: '100px', height: '130px', padding: '10px' }} />
                </div>
                <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>INR: {product.price}</Card.Text>
                </Card.Body>
                <Card.Footer style={{ background: 'white' }}>
                    <Button variant="primary" onClick={() => addToCart(product)}>Add to Cart</Button>
                </Card.Footer>
            </Card>
        </div>
    );

    return (
        <>
            <h1>Product Dashboard</h1>
            <div className='row'>
                {cards}
            </div>
        </>
    )
}

export default Product;