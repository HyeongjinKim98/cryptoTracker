import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";

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
const CoinsList = styled.ul``;

const Coin = styled.li`
    background-color: white;
    color : ${(props) => props.theme.bgColor};
    padding : 20px;
    border-radius : 15px;
    margin-bottom: 10px;
    a{
        align-items:center;
        display: flex;
        transition: color 0.2s ease-in;
        padding : 10px;
        font-size: 20px;
    }
    &:hover {
        a{
            color: ${(props)=>props.theme.accentColor}
        }
    }
`;

const Img = styled.img`
    width :35px;
    height: 35px;
    margin-right: 10px;
`
const Loader = styled.span`
    text-align : center;
    display: block;
`
const Title = styled.h1`
    font-size: 48px;
    color : ${(props) => props.theme.accentColor};
`;

interface ICoin{
    id: string
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
}
function Coins() {
    // const [coins,setCoins] = useState<CoinInterface[]>([]);
    // const [loading,setLoading] = useState(true);
    // useEffect(()=>{
    //         (async()=>{
    //             const response  = await fetch("https://api.coinpaprika.com/v1/coins");
    //             const json = await response.json();
    //             setCoins(json.slice(0,100));
    //             setLoading(false);
    //         })();
    //     },[]);
    const {isLoading,data} = useQuery<ICoin[]>("allCoins",fetchCoins)
    // requires 1. query key 2.fetcher function
    return (
        <>
        <Helmet>
                <title>COIN TRACKER</title>
        </Helmet><Container>
                <Header>
                    <Title>COIN TRACKER</Title>
                </Header>
                {isLoading ? (
                    <Loader>Loading...</Loader>
                ) : (
                    <CoinsList>
                        {data?.slice(0, 10).map((coin) => (
                            <Coin key={coin.id}>
                                <Link
                                    to={{
                                        pathname: `/${coin.id}`,
                                    }}>
                                    <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
                                    {coin.name} &rarr;
                                </Link>
                            </Coin>
                        ))}
                    </CoinsList>
                )}
            </Container></>
    );
}
export default Coins;