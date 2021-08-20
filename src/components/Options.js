import React, {useState, useEffect} from 'react'
import "./Poll.css"

export default function Options(props) {
    const [selection, setSelection] = useState('');
    const [clicks, addClick] = useState(0);
    const movie = props.props;
    const members = props.count;

    function name(movie) {
        return movie.name ? movie.name : movie.title;
    }

    useEffect(() => {
        console.log(clicks + ' people picked ' + name(selection));

    }, [selection, clicks])

    const Progress = () => {
        const [style, setStyle] = React.useState({});
        
        setTimeout(() => {
            const newStyle = {
                opacity: 1,
                width: `${(clicks / members) * 100}%`
            }
            
            setStyle(newStyle);
        }, 50);
        
        return (
            <>
                <div className="progress">
                    <div className="movieName">{name(selection)}</div>
                    <div className="progress-done" style={style}>
                    </div>
                </div>
            </>
        )
    }

    return (
        <div className="options" onClick={() => {
            setSelection(movie)
            if (clicks < props.count) addClick(clicks + 1);
        }}>
            <Progress></Progress>
        </div>
    )
}
