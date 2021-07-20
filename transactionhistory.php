<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Transaction History</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="css/main.css">
</head>

<body>

<?php
  include 'navbar.php';
?>

	<div class="container">
        <h2 class="text-center pt-5 pb-2 heading">Transaction History</h2>
        
       <br>
       <div class="table-responsive-sm mb-3">
        <table class="table table-hover table-condensed table-bordered ">
            <thead style="color : black;">
                <tr>
                    <th class="text-center">S.No.</th>
                    <th class="text-center">Sender</th>
                    <th class="text-center">Receiver</th>
                    <th class="text-center">Amount</th>
                    <th class="text-center">Date & Time</th>
                </tr>
            </thead>
            <tbody>
            <?php

                include 'config.php';

                $sql ="select * from transaction";

                $query =mysqli_query($conn, $sql);

                while($rows = mysqli_fetch_assoc($query))
                {
            ?>

                <tr style="color : black;">
                <td class="py-2"><?php echo $rows['tid']; ?></td>
                <td class="py-2"><?php echo $rows['sender']; ?></td>
                <td class="py-2"><?php echo $rows['receiver']; ?></td>
                <td class="py-2"><?php echo $rows['amount']; ?> </td>
                <td class="py-2"><?php echo $rows['date']; ?> </td>
                    
            <?php
                }

            ?>
            </tbody>
        </table>

    </div>
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
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx" crossorigin="anonymous"></script>
</body>
</html>