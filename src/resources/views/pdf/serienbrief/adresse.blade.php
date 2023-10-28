<!-- View stored in resources/views/greeting.blade.php -->

<html>

<body>
    <!-- Adressblock -->
    <div style="font-size:9.4pt">
        <div style="font-size:2.5mm;color:#808080;">{{$absender}}</div>
        <div style="margin-bottom:5mm;margin-top:5mm;">An</div><br />
        <span>{{$empfaenger}}</span><br />
        <span>{{$strasseHausnummer}}</span><br />
        <span>{{$plzStadt}}</span>
    </div>
    <!-- Datum -->

    <div style="text-align:right;font-size:9.4pt;margin-top:-10mm;margin-bottom:20mm;">{{$datum}}</div>
    <div style=""></div>
    <div style=""></div>
    <div style=""></div>
    <br/><br/>
    <div style="font-size:9.4pt;margin-top:30mm;">{{$ansprache}}</div>
</body>

</html>