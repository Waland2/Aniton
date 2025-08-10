import img1 from "../images/image.png"
import money_icon from "../icons/money.svg"

import { formatNumber } from "../utils";
import { useContext, useEffect, useState } from "react";
import AppContext from "../AppContext";
import api from "../main";

function Upgrade({ name, image, money_cost, id, passive_income_boost, profit_ratio_boost, is_purchased, upgrades, setUpgrades }) {
    const { user, setUser } = useContext(AppContext)

    const purchase = (info) => {
        if (is_purchased || (user.money < money_cost)) return;
        const upgradeId = info.currentTarget.dataset.id;
    
        api.post(`upgrade/purchase/${upgradeId}`).then(resp => {
            setUser(prevUser => ({
                ...prevUser,
                upgrades: {
                    ...prevUser.upgrades,
                    [upgradeId]: { status: resp.data.status }
                },
                money: prevUser.money - money_cost,
                passive_income: prevUser.passive_income + passive_income_boost
            }));

            setUpgrades(prevUpgrades => (
                prevUpgrades.map((upgrade, index) => {
                    return upgrade.id == upgradeId ? { ...upgrade, is_purchased: true } : upgrade
                })
            ))
        })
    }

    return <span onClick={purchase} className={"upgrade" + ((user.money < money_cost && !is_purchased) ? " disable" : "") + (is_purchased ? " purchased" : "")} data-id={id}>
        <img className="upgrade-image" src={image ? image.replace("http:", "https:") : img1} alt="" />
        <div className="pur-backround"><h2>Purchased</h2></div>
        <div className="upgrade-info">
            <span className="upgrade-name">{name}</span>
            <div className="upgrade-number-info">
                <span className="upgrade-cost">Price: {formatNumber(money_cost)}$</span>
                {profit_ratio_boost === 0 ? <></> : <span className="upgrade-passive">+ {formatNumber(profit_ratio_boost)} profit points</span>}
                {passive_income_boost === 0 ? <></> : <span className="upgrade-profit">+ {formatNumber(passive_income_boost)}<img className="cost-icon" src={money_icon} alt="" />/minute</span>}
            </div>
        </div>
    </span>
}

export default Upgrade;
