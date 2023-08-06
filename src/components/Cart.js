import { useSelector, useDispatch } from "react-redux";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { remove } from '../store/cartSlice';

const Cart = () => {

    const products = useSelector(state => state.cart);

    const dispatch = useDispatch();

    const removeFromCart = (id) => {
        // Dispatch a remove action. 
        dispatch(remove(id));
    }

    const cards = products.map(product =>
        <div key={product.id} className="col-md-12" style={{ marginBottom: "10px" }}>
            <Card className="h-100">
                <div className="text-center">
                    <Card.Img variant="top" src={product.image} style={{ width: '100px', height: '130px', padding: '10px' }} />
                </div>
                <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    INR: <Card.Text>{product.price}</Card.Text>
                </Card.Body>
                <Card.Footer style={{ background: 'white' }}>
                    <Button variant="danger" onClick={() => removeFromCart(product.id)}>Remove Item</Button>
                </Card.Footer>
            </Card>
        </div>
    );

    return (
        <>
            <div className="row">
                {cards}
            </div>
        </>
    )
}

export default Cart;