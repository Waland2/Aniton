
import Upgrade from "./Upgrade"

import "../css/shop.css"
import { useContext, useEffect, useState } from "react"
import AppContext from "../AppContext"



function Shop() {
    const {user, setUser} = useContext(AppContext);
    const {upgrades, setUpgrades} = useContext(AppContext);

    return <div id="shop">
        <div className="upgrades">
            {upgrades === null ? <></> : upgrades.map((upgrade, index) => (
                (upgrade.is_purchased ? <></> : <Upgrade name={user.language === "en" ? upgrade.name_eng : upgrade.name_rus} image={upgrade.image} money_cost={upgrade.money_cost} id={upgrade.id} passive_income_boost={upgrade.passive_income_boost} profit_ratio_boost={upgrade.profit_ratio_boost} is_purchased={upgrade.is_purchased} upgrades={upgrades} setUpgrades={setUpgrades}/>)
            ))} 
            <div className="line"></div>
            {upgrades === null ? <></> : upgrades.map((upgrade, index) => (
                (!upgrade.is_purchased ? <></> : <Upgrade name={user.language === "en" ? upgrade.name_eng : upgrade.name_rus} image={upgrade.image} money_cost={upgrade.money_cost} id={upgrade.id} passive_income_boost={upgrade.passive_income_boost} profit_ratio_boost={upgrade.profit_ratio_boost} is_purchased={upgrade.is_purchased} upgrades={upgrades} setUpgrades={setUpgrades}/>)
            ))}
        </div>


    </div>
}


export default Shop