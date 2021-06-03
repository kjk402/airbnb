import React from "react";
import { useState, useCallback, useMemo, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import styled from "styled-components";

interface IAppProps {
	data: object[];
}

function Map({ data }: IAppProps) {
	const [map, setMap] = useState(null);
	// const [center, setCenter] = useState<any>({});
	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: "AIzaSyDv1rXMbgEavH8dd2GeaLVNyiVH_svMlV4",
	});
	const coordinateList = data.map((el: any) => el.room.location);
	const markers = coordinateList.map((el, idx) => <Marker key={idx} position={{ lat: el.latitude, lng: el.longitude }} />);
	console.log("좌표: ", coordinateList);
	const containerStyle = {
		width: "100%",
		height: "800px",
	};

	const center = {
		lat: coordinateList[0].latitude,
		lng: coordinateList[0].longitude,
	};

	const onLoad = useCallback(function callback(map) {
		const bounds = new window.google.maps.LatLngBounds();
		map.fitBounds(bounds);
		setMap(map);
	}, []);

	const onUnmount = useCallback(function callback(map) {
		setMap(null);
	}, []);

	return (
		<StyleMap>
			{center && isLoaded ? (
				<GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10} onLoad={onLoad} onUnmount={onUnmount}>
					{/* Child components, such as markers, info windows, etc. */}
					{markers}
					<></>
				</GoogleMap>
			) : (
				<></>
			)}
		</StyleMap>
	);
}

export const MapMemo = React.memo(Map);

const StyleMap = styled.div`
	width: 100%;
	padding-left: 10px;
`;
