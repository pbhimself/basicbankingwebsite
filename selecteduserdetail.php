<?php
include 'config.php';

if(isset($_POST['submit']))
{
    $from = $_GET['id'];
    $to = $_POST['to'];
    $amount = $_POST['amount'];

    $sql = "SELECT * from user where user_id=$from";
    $query = mysqli_query($conn,$sql);
    $sql1 = mysqli_fetch_array($query); // returns array or output of user from which the amount is to be transferred.

    $sql = "SELECT * from user where user_id=$to";
    $query = mysqli_query($conn,$sql);
    $sql2 = mysqli_fetch_array($query);



    // constraint to check input of negative value by user
    if (($amount)<0)
   {
        echo '<script type="text/javascript">';
        echo ' alert("Oops! Negative values cannot be transferred")';  // showing an alert box.
        echo '</script>';
    }


  
    // constraint to check insufficient balance.
    else if($amount > $sql1['Cbalance']) 
    {
        
        echo '<script type="text/javascript">';
        echo ' alert("Bad Luck! Insufficient Balance")';  // showing an alert box.
        echo '</script>';
    }
    


    // constraint to check zero values
    else if($amount == 0){

         echo "<script type='text/javascript'>";
         echo "alert('Oops! Zero value cannot be transferred')";
         echo "</script>";
     }


    else {
        
                // deducting amount from sender's account
                $newbalance = $sql1['Cbalance'] - $amount;
                $sql = "UPDATE user set Cbalance=$newbalance where user_id=$from";
                mysqli_query($conn,$sql);
             

                // adding amount to reciever's account
                $newbalance = $sql2['Cbalance'] + $amount;
                $sql = "UPDATE user set Cbalance=$newbalance where user_id=$to";
                mysqli_query($conn,$sql);
                
                $sender = $sql1['Name'];
                $receiver = $sql2['Name'];
                $sql = "INSERT INTO transaction(`sender`, `receiver`, `amount`) VALUES ('$sender','$receiver','$amount')";
                $query=mysqli_query($conn,$sql);

                if($query){
                     echo "<script> alert('Transaction Successful');
                                     window.location='transactionhistory.php';
                           </script>";
                    
                }
                else{
                    echo "<script> alert('Transaction failed');
                    window.location='transactionhistory.php';
                           </script>";
                }

                $newbalance= 0;
                $amount =0;
        }
    
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Transaction</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <link rel="stylesheet" href="css/main.css">
</head>

<body style="background-color:#d8d8d8;">
 
<?php include('navbar.php');?>

	<div class="container">
        <h2 class="text-center pt-5 pb-1 heading">Make a Transaction</h2>
            <?php
                include 'config.php';
                $suser_id=$_GET['id'];
                $sql = "SELECT * FROM  user where user_id=$suser_id";
                $result=mysqli_query($conn,$sql);
                if(!$result)
                {
                    echo "Error : ".$sql."<br>".mysqli_error($conn);
                }
                $rows=mysqli_fetch_assoc($result);
            ?>
            <form method="post" name="tcredit" class="tabletext" ><br>
            <div>
                <h5>Sender's Details</h5>
                <table class="table table-condensed table-bordered">
                    <thead>
                        <tr style="color : black;">
                            <th class="text-center">Id</th>
                            <th class="text-center">Name</th>
                            <th class="text-center">Email</th>
                            <th class="text-center">Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="color : black;">
                            <td class="py-2"><?php echo $rows['user_id'] ?></td>
                            <td class="py-2"><?php echo $rows['Name'] ?></td>
                            <td class="py-2"><?php echo $rows['Email'] ?></td>
                            <td class="py-2"><?php echo $rows['Cbalance'] ?></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="container py-5">
            <div class="row">
                <div class="col-md-6">
                    <label style="color : black;"><b>Transfer To:</b></label>
                    <select name="to" class="form-control" required>
                        <option value="" disabled selected>Choose</option>
                        <?php
                            include 'config.php';
                            $suser_id=$_GET['id'];
                            $sql = "SELECT * FROM user where user_id!=$suser_id";
                            $result=mysqli_query($conn,$sql);
                            if(!$result)
                            {
                                echo "Error ".$sql."<br>".mysqli_error($conn);
                            }
                            while($rows = mysqli_fetch_assoc($result)) {
                        ?>
                        <option class="table" value="<?php echo $rows['user_id'];?>" >
                                <?php echo $rows['Name'] ;?>
                        </option>
                    <?php 
                    } 
                    ?>
                <div>
                    </select>
                </div>
                <div class="col-md-6">
                    <label style="color : black;"><b>Amount:</b></label>
                    <input type="number" class="form-control" name="amount" required>   
                </div>
            </div>
            <div class="row mt-5">
                    <div class="col-12">
                        <div class="text-center" >
                            <button class="btn btn-primary " name="submit" type="submit" user_id="myBtn" >Transfer</button>
                        </div>
                    </div>
            </div>
            </div>
        </form>   
    </div>
    <footer class="py-3 mt-3" style="background: #2B6477!important;">
        <div class="container text-center">
            <div class="row">
                <div class="col-12">
                    <p style="font-size:17px">Copyrights @ 2021 All Rights Reserved By Jitendra Panwar</p>
                </div>
            </div>
        </div>
</footer>
<script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
</body>
</html>