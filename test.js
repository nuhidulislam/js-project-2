function getTimeString(time){
    const hour= parseInt(time/3600);
    let remaingSeconds=time%3600;
    const minutes= parseInt(remaingSeconds/60);
    const second=remaingSeconds%60;

return `${hour} hour ${minutes} minutes ${second} seconds ago`

}
