import { getThemeContext } from "../../../../../shared/contexts";
import { Button, Status } from  "../../../../../shared/ui";
import type { ControlPanelType } from "./controlPanel.type";
import './controlPanel.scss'

export function ControlPanel({status, edit, remove, markAsPaid}: ControlPanelType) {
    const theme = getThemeContext();
    return (
        <div className={`controlPanel controlPanel_theme_${theme}`}>
            <div className="controlPanel__status">
                <p className="controlPanel__status-title">Status</p>
                <Status statusType={status} />
            </div>
            <div className={`controlPanel__controlBtns controlPanel__controlBtns_theme_${theme}`}>
                <Button 
                    type='button' 
                    style="chameleon" 
                    onClick={edit} 
                >Edit</Button>
                <Button 
                    type='button' 
                    style='red'       
                    onClick={remove}
                >Delete</Button>
                <Button 
                    type='button' 
                    style="purple"   
                    onClick={markAsPaid}
                >Mark as Paid</Button>
            </div>
        </div>
    );
}