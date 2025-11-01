import { getThemeContext } from "../../../../../shared/contexts";
import { Button, Status } from  "../../../../../shared/ui";
import type { ControlPanelType } from "./controlPanel.type";
import './controlPanel.scss'

export function ControlPanel({status, handleEdit}: ControlPanelType) {
    const theme = getThemeContext();
    return (
        <div className={`controlPanel controlPanel_theme_${theme}`}>
            <div className="controlPanel__status">
                <p className="controlPanel__status-title">Status</p>
                <Status statusType={status} />
            </div>
            <div className={`controlPanel__controlBtns controlPanel__controlBtns_theme_${theme}`}>
                <Button type='button' style="chameleon" onClick={handleEdit} >Edit</Button>
                <Button type='button' style='red'      >Delete      </Button>
                <Button type='button' style="purple"   >Mark as Paid</Button>
            </div>
        </div>
    );
}