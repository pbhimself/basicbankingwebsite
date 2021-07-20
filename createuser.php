<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add Customer</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="css/main.css">
</head>

<body>
    <?php
        include 'config.php';
        if(isset($_POST['submit'])){
        $name=$_POST['name'];
        $email=$_POST['email'];
        $balance=$_POST['balance'];
        $sql="insert into user(Name,Email,Cbalance) values('{$name}','{$email}','{$balance}')";
        $result=mysqli_query($conn,$sql);
        if($result){
                  echo "<script> alert('Customer added successfully.');
                                  window.location='transfermoney.php';
                        </script>";
                        
        }
      }
    ?>

  <?php include 'navbar.php';?>
  <div class="container" id="adduser">
    <h3 class="text-center my-3 heading">Add a new customer</h3>
    <div class="row">
      <div class="col text-center">
        <img src="img/addcustomer.png" alt="">
        <form class="form" method="post">
            <div class="form-group">
              <input class="form-control w-50" placeholder="ENTER NAME" type="text" name="name" required>
            </div>
            <div class="form-group">
              <input class="form-control w-50" placeholder="ENTER EMAIL" type="email" name="email" required>
            </div>
            <div class="form-group float-center">
              <input class="form-control w-50" placeholder="CURRENT BALANCE" type="number" name="balance" required>
            </div>
            <br>
            <div class="form-group button">
              <input class="btn btn-success mr-3" type="submit" value="CREATE" name="submit"></input>
              <input class="btn btn-primary" type="reset" value="RESET" name="reset"></input>
            </div>
          </form>
      </div>
    </div>
  </div>

  <!-- <div class="background">
  <div class="container">
    <div class="screen">
      <div class="screen-header">
        <div class="screen-header-right">
          <div class="screen-header-ellipsis"></div>
          <div class="screen-header-ellipsis"></div>
          <div class="screen-header-ellipsis"></div>
        </div>
      </div>
      <div class="screen-body">
        <div class="screen-body-item left">
          <img class="img-fluid" src="img/user3.jpg" style="border: none; border-radius: 50%;">
        </div>
        <div class="screen-body-item">
          <form class="app-form" method="post">
            <div class="app-form-group">
              <input class="app-form-control" placeholder="NAME" type="text" name="name" required>
            </div>
            <div class="app-form-group">
              <input class="app-form-control" placeholder="EMAIL" type="email" name="email" required>
            </div>
            <div class="app-form-group">
              <input class="app-form-control" placeholder="BALANCE" type="number" name="balance" required>
            </div>
            <br>
            <div class="app-form-group button">
              <input class="app-form-button" type="submit" value="CREATE" name="submit"></input>
              <input class="app-form-button" type="reset" value="RESET" name="reset"></input>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div> -->
<footer class="py-3 mt-5" style="background: #2B6477!important;position:absolute;bottom:0;width:100%">
        <div class="container text-center">
            <div class="row">
                <div class="col-12">
                    <p style="font-size:17px">Copyrights @ 2021 All Rights Reserved By Jitendra Panwar</p>
                </div>
            </div>
        </div>
</footer>
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx" crossorigin="anonymous"></script>
</body>
</html>