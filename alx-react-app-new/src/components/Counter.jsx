import { useState } from "react";


function Counter() {
    const [count, setCount] = useState(0);
    return (
    <div>   
        <button onClick={() => setCount(count + 1)}>Increment</button>
        <button onClick={() =>setCount(count - 1)}>Decrement</button>
        <button onClick={() =>setCount(count)}>Reset</button>
    </div>
    );
}
export default Counter;