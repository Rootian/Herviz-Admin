
export function dateFormat(row, column, cellValue, index){
  const daterc = row[column.property]
  if(daterc){
    const dateMat= new Date(parseInt(daterc.replace("/Date(", "").replace(")/", ""), 10));
    const year = dateMat.getFullYear();
    const month = dateMat.getMonth() + 1;
    const day = dateMat.getDate();
    const hh = dateMat.getHours();
    // const mm = dateMat.getMinutes();
    // const ss = dateMat.getSeconds();
    const timeFormat= year + "/" + month + "/" + day + " " + hh;
    return timeFormat;
  }
}

