import React from "react";


export const getFavorite = async () =>{
    const [favorite, setFavorite] = useState([]);
    await onValue(ref(getDatabase(), "Favorite/"), (snapshot) => {
        setFavorite(Object.values(snapshot.val()));
      });

    return favorite;
}