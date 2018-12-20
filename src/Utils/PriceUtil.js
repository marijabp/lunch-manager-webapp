import React from 'react';

const styles = {
    fontFamily: "Comic Sans MS",
}
const formatPrice= (price) => {
    return <div style={styles}> {price} KM </div>

}

export { formatPrice };