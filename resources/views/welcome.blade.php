<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta name="csrf-token" content="{{ csrf_token() }}">
        <title>Laravel</title>
		<link href="{{asset('css/app.css')}}" rel="stylesheet" type="text/css">
		<link rel="stylesheet" href="https://unpkg.com/leaflet@1.4.0/dist/leaflet.css" rel="stylesheet" type="text/css">
    </head>
    <body>
		<div id="root" class="container"></div>
        <script src="{{asset('js/app.js')}}" ></script>
    </body>
</html>