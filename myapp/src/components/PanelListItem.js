const DashboardListItem=({classNameIcon,title})=>{
return(

    <div className="itemContainer">
<i className={classNameIcon}></i>
<h6>{title}</h6>

    </div>
)
}
export default DashboardListItem;