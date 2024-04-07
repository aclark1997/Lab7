import React from "react";
import http from "http";
import { Input } from "antd";
import {Button } from "antd"; 
import { useState } from 'react';
import {Carousel} from 'antd';


export default function App() {
    const carouselStyles = {
        "width": "640px", 
        "border": "solid 1px #000", 
        "margin": "auto"
    };

    const [albums, setAlbums] = useState([]);

    var searchTerm = "";
    var limit = 5;

    async function fetchData() {
    	const baseURL = 'https://www.apitutor.org/spotify/simple/v1/search';
    	const url = `${baseURL}?q=${searchTerm}&type=track&limit=${limit}`;
    	const request = await fetch(url);
    	const data = await request.json();
    	console.log(data);
	setAlbums(data);
    }

    function albumToJSX(albumJSON) {
        return (
            <div key={albumJSON.id}>
                <img src={albumJSON.image_url} />
                <h3>{albumJSON.name}</h3>
            </div>
        )
    } 	   

    function artistChange(e){
	searchTerm = e.target.value;
    }

    function limitChange(e){
	limit = e.target.value
    }
    return (
        <>
            <header>
                <h1>Spotify Demo</h1>
            </header>
            <main>
                <Input onChange={artistChange} placeholder="artist name" />
		<Input onChange={limitChange} placeholder="limit" />
		<Button onClick={fetchData}>Search</Button>
<div style={carouselStyles}>
            <Carousel dotPosition="top">
                { 
                    albums.map(albumToJSX)
                }
            </Carousel>
        </div>	            
</main>
        </>
    );
}
