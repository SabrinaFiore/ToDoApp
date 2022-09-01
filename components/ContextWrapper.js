import TableContext from "../contexts/TableContext";
import { useState } from "react";

function ContextWrapper({children, navigation}) {
    const [menuItems] = useState(navigation)

    return (
        <TableContext.Provider value={{menuItems}}>
            {children}
        </TableContext.Provider>
    )
}

export default ContextWrapper;