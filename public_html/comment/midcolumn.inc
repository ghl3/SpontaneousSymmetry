

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



  <!-- Field 1 -->
  <fieldset>
    <legend>Add a Comment</legend>

    <label  accesskey="f">First name: </label>
    <input type="text" id="firstname" name="firstname" tabindex="1" value="" title="first name"><br>

    <label  accesskey="l">Last name: </label>
    <input type="text" id="lastname" name="lastname" tabindex="2" title="last name"><br>
    
    <label  class="required" accesskey="e">Email: </label>
    <input type="text" id="email" name="email" tabindex="3" title="email"><br>
    
    <label  class="required" accesskey="e">Comment: </label>
    <textarea  name="message"  id="msg"  rows="5" style="text-align: left" onKeyDown="limitText(this.form.msg,this.form.countdown,140);" 
	       cols="30"  onKeyUp="limitText(this.form.msg,this.form.countdown,140);" > </textarea> 

    <label  class="required" accesskey="e"> </label>
    <div class="required"> <font size="1">(Maximum characters: 140) </font> <br> </div>

    <label  class="required" accesskey="e"></label>
    <input type="submit" value="Submit" >

  </fieldset>

</form>

