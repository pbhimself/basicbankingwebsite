<!doctype html>
<html lang="en">
  <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <title>Basic Banking System</title>
      <link rel="stylesheet" href="css/main.css">
      <!-- Bootstrap css cdn -->
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
  </head>

  <body>
  <?php include('navbar.php');?>
  <section id="banner">
    <div class="bg">
      <h1 class="text-center">Welcome To The Basic Banking System</h1>
      <p>Basic Banking System is an application which performs transaction of amount 
         between two customers and transaction details is displayed under transaction history tab.
         This application is supposed to have 10 dummy customers initially, we can add more customers 
         with their details like Name, Email and Current Balance.
      </p>
      <center><a href="#menu" class="btn btn-primary">Get Started</a></center>
    </div>
  </section>
  <section id="menu">
      <div class="container">
        <div class="row">
          <div class="col-lg-6 px-5">
            <div class="box shadow">
              <img src="img/user.png" alt="">
              <center><a href="transfermoney.php" class="btn btn-success">View Customers</a></center>
            </div>
          </div>
          <div class="col-lg-6 mt-5 mt-lg-0 px-5">
            <div class="box shadow">
              <img src="img/transaction.png" alt="" >
              <center><a href="transactionhistory.php" class="btn btn-success">Transaction History</a></center>
            </div>
          </div>
        </div>
      </div>
  </section>
    
      <!-- Activity section -->
            <!-- <div class="row activity text-center">
                  <div class="col-md act">
                    <img src="img/user.jpg" class="img-fluid">
                    <br>
                    <a href="createuser.php"><button>Create a User</button></a>
                  </div>
                  <div class="col-md act">
                    <img src="img/transfer.jpg" class="img-fluid">
                    <br>
                    <a href="transfermoney.php"><button >Make a Transaction</button></a>
                  </div>
                  <div class="col-md act">
                    <img src="img/history.jpg" class="img-fluid">
                    <br>
                    <a href="transactionhistory.php"><button>Transaction History</button></a>
                  </div>
            </div>
      </div> -->
      <footer class="bg-white py-3" style="background: #2B6477!important;">
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