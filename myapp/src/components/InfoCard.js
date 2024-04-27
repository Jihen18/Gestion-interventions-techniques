const InfoCard=({title,number,iconName,className})=>{
    return(<>
<div className="globalCardContainer">

<div className="infoCardContainer" >
<div className={`iconContainer ${className}`}>


<i className="material-icons cardIcon">{iconName} </i>
</div>

<div className="cardContent"><p>{title}</p>

<h4>en nombre est {number}</h4></div>

</div>

</div>
</>
    )
}
export default InfoCard;
