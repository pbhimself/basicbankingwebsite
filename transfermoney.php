<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Transfer Money</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <!-- <link rel="stylesheet" type="text/css" href="css/table.css"> -->
    <link rel="stylesheet" type="text/css" href="css/main.css">

    <style type="text/css">
      button{
        transition: 1.5s;
      }
      button:hover{
        background-color:#616C6F;
        color: white;
      }
    </style>
</head>

<body style="background-color:#ffffff">
<?php
    include 'config.php';
    $sql = "SELECT * FROM user";
    $result = mysqli_query($conn,$sql);
?>

<?php include('navbar.php');?>

<div class="container">
        <h2 class="text-center pt-5 pb-3 heading">Transfer Money</h2>
            <div class="row">
                <div class="col">
                    <div class="table-responsive-sm">
                        <table class="table table-hover table-sm table-condensed table-bordered" style="border-color:black;">
                            <thead style="color : black;">
                                <tr>
                                    <th scope="col" class="text-center py-2">Id</th>
                                    <th scope="col" class="text-center py-2">Name</th>
                                    <th scope="col" class="text-center py-2">E-Mail</th>
                                    <th scope="col" class="text-center py-2">Balance</th>
                                    <th scope="col" class="text-center py-2">Operation</th>
                                </tr>
                            </thead>
                            <tbody>
                    <?php while($rows=mysqli_fetch_assoc($result)){?>
                        <tr style="color : black;">
                            <td class="py-2"><?php echo $rows['user_id'] ?></td>
                            <td class="py-2"><?php echo $rows['Name']?></td>
                            <td class="py-2"><?php echo $rows['Email']?></td>
                            <td class="py-2"><?php echo $rows['Cbalance']?></td>
                            <td class="text-center"><a href="selecteduserdetail.php?id= <?php echo $rows['user_id'] ;?>"> <button type="button" class="btn btn-info">Transact</button></a></td> 
                        </tr>
                    <?php
                        }
                    ?>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div> 
            <h4 class="py-3">Didn't get the sender here...! <a href="createuser.php">Create here new</a></h4>
         </div>
         
         <footer class="py-3 mt-5" style="background: #2B6477!important;">
            <div class="container text-center">
                <div class="row">
                    <div class="col-12">
                        <p style="font-size:17px">Copyrights @ 2021 All Rights Reserved By Pratik Bhangale</p>
                    </div>
                </div>
            </div>
        </footer>
<script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
</body>
</html>