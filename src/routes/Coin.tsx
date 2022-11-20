import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const Loader = styled.span`
    text-align : center;
    display: block;
`
const Title = styled.h1`
    font-size: 48px;
    color : ${(props) => props.theme.accentColor};
`;
const Container = styled.div`
    padding : 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;
const Header = styled.header`
    height : 10vh;
    display : flex;
    justify-content: center;
    align-items: center;

`;

interface RouteParams {
    coinId: string;
}
interface RouteState{
    name : string;
}
function Coin() {
    const [loading,setLoading] = useState(true);
    const { coinId } = useParams();
    const { state } = useLocation();
    const [info, setInfo] = useState({});
    const [priceInfo, setPriceInfo] = useState({});
    //execute only first time components bors
    useEffect(()=>{
        (async () => {
            const infoData = await(
                await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
            ).json();
            const priceData = await(
                await fetch(`ttps://api.coinpaprika.com/v1/tickers/${coinId}`)
            ).json();
            setInfo(infoData);
            setPriceInfo(priceData);
        })();
    },[]);
    return (
        <Container>
            <Header>
                <Title>{state?.name||"Loading"}</Title>
            </Header>
            {loading ? (<Loader>Loading...</Loader>) : <span>{info.}</span>}
        </Container>
    );
}
export default Coin;