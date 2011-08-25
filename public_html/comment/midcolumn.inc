

<script type="text/javascript">
function SelectAll(id)
{
    document.getElementById(id).focus();
    document.getElementById(id).select();
}
</script>
	

<script language="javascript" type="text/javascript">

function limitText(limitField, limitCount, limitNum) {

 if (limitField.value.length > limitNum) {
   limitField.value = limitField.value.substring(0, limitNum);
 } else {
   limitCount.value = limitNum - limitField.value.length;
 }

}
</script>


	<br>
	<center><b>COMMENT</b></center>



<br>Feel free to leave a comment, message, or question below: <br> <br>

<form action="insert.php" method="post">

<table width="auto">
<tr>
<td> First Name: </td>    <td COLSPAN=2>  <input type="text" name="firstname" size="30" > </td>
</tr>
<tr>
<td>Last Name: </td>     <td COLSPAN=2> <input type="text" name="lastname" size="30" > </td>
</tr>
<tr>
<td> Email Address: </td> <td COLSPAN=2> <input type="text" name="email" size="30" > <br> </td>
</tr>
<tr>
<td> Message: <br><br> </td>   
<td COLSPAN=2>   
<textarea  name="message"  id="msg"  rows="5" style="text-align: left" onKeyDown="limitText(this.form.msg,this.form.countdown,140);" 
           cols="30"  onKeyUp="limitText(this.form.msg,this.form.countdown,140);" > </textarea> 
<br><font size="1">(Maximum characters: 140) </font> <br>
</td>

</tr>
</table>
<input type="submit" value="Submit" >

</form>
