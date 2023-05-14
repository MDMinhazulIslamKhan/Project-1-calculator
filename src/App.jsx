import { useEffect, useState } from "react";
import "./styles/_global.scss";

function App() {
  const [display, setDisplay] = useState('');
  const [result, setResult] = useState('');

  // clear (AC) button clicked function
  const clear = () => {
    setDisplay('');
    setResult('');
  }

  // backSpace (C) button clicked function
  const backSpace = () => {
    setResult('');
    setDisplay(display.slice(0, -1));
  }

  // all button clicked function
  const handleClick = e => {
    setResult('')
    setDisplay(display + e.target.name);
  }

  // equal button clicked function
  const handleResult = async () => {
    let allInputs = display;
    allInputs = allInputs.replace(/%/g, '/100');
    allInputs = allInputs.replace(/÷/g, '/');
    calculate(allInputs);
  }

  // calculate function
  const calculate = (Input) => {
    try {
      setDisplay(eval(Input).toString());
      setResult(eval(Input).toString());
    } catch (error) {
      setDisplay('SYNTAX ERROR')
    }
  }

  useEffect(() => {
    // Format larger numbers
    if (result !== '' && Number(result) > 1000000) {
      const scientificNumber = Number(result).toExponential()
      setResult(scientificNumber.toString(3));
    }

    // Format smaller numbers
    else if (result !== '' && Number(result) < .000001) {
      const scientificNumber = Number(result).toExponential()
      setResult(scientificNumber.toString());
    }

    // Format very small decimal
    else if (result !== '' && result - Math.floor(result) < .000001) {
      setResult(Math.floor(result));
      setDisplay(result)
    }

    // Format big decimal
    else if (result !== '' && (result - Math.floor(result)).toString().length > 5) {
      setResult(Number(result).toFixed(5));
      setDisplay(result)
    }
  }, [result])


  return (
    <div className="calculator">
      <form className="display">
        <input type="text" value={result === '' ? display : result} />
      </form>
      <div className="calculator__keypad">
        <button onClick={clear} className=" calculator__keypad--red">AC</button>
        <button onClick={backSpace} className=" calculator__keypad--red">C</button>
        <button onClick={handleClick} name="%" className="calculator__keypad--orange">%</button>
        <button onClick={handleClick} name="÷" className="calculator__keypad--orange">÷</button>
        <button onClick={handleClick} name="7" className="">7</button>
        <button onClick={handleClick} name="8" className="">8</button>
        <button onClick={handleClick} name="9" className="">9</button>
        <button onClick={handleClick} name="*" className="calculator__keypad--orange">*</button>
        <button onClick={handleClick} name="4" className="">4</button>
        <button onClick={handleClick} name="5" className="">5</button>
        <button onClick={handleClick} name="6" className="">6</button>
        <button onClick={handleClick} name="-" className="calculator__keypad--orange">-</button>
        <button onClick={handleClick} name="1" className="">1</button>
        <button onClick={handleClick} name="2" className="">2</button>
        <button onClick={handleClick} name="3" className="">3</button>
        <button onClick={handleClick} name="+" className="calculator__keypad--orange">+</button>
        <button onClick={handleClick} name="0" className="">0</button>
        <button onClick={handleClick} name="." className="">.</button>
        <button onClick={handleResult} name="=" className="calculator__keypad--big  calculator__keypad--green">=</button>
      </div>
    </div>
  )
}

export default App