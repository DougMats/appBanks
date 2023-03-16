import React, { createContext, useContext, useEffect, useState } from "react";
import { Text, View } from 'react-native';
import useSqliteViewModel from "./db.lite.viewModel";

const DBContext = createContext();

export function useDbContextViewModel() {
    return useContext(DBContext);
}

export function DbContextProvider({ children }) {
    const { getDBConnection, createTables } = useSqliteViewModel();
    const [isLoding, setIsLoding] = useState(true);
    const [db, setDb] = useState(null);

    useEffect(function () {
        let _db = null;

        async function getConnection() {
            _db = await getDBConnection();
            await createTables(_db);
            setDb(_db);
            setTimeout(() => {
                setIsLoding(false);
            }, 1500);
        }
        getConnection();
        return function () {
            if (_db !== null) {
                _db.close();
            }
        }
    }, []);
    if (isLoding) {
        return (
            <View style={{ flex: 1, justifyContent: "center", }}>
                <Text style={{ textAlign: "center", color: "#800480" }}>
                    Loading...
                </Text>
            </View>
        );
    }
    return <DBContext.Provider value={db}>{children}</DBContext.Provider>
}
