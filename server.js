var jsdom = require('jsdom');

Object.prototype.forEach = function( f ) {
	for( var key in this ) {
		if( this.hasOwnProperty( key ) ) {
			f( this[ key ], key );
		}
	}
};

Object.prototype.map = function( f ) {
	var vs = [];

	for( var key in this ) {
		if( this.hasOwnProperty( key ) ) {
			vs.push( f( this[ key ], key ) );
		}
	}

	return vs;
};

[ '', '100', '200', '300' ].forEach( function( range ) {
	jsdom.env( 'http://provo.craigslist.org/apa/index' + range + '.html', function( errors, window ) {
		if( errors ) {
			console.log( errors );
		}
		else {
			var listings = window.document.getElementsByClassName( 'row' ).map( function( listing ) {
				var info = {};

				info.raw = listing.textContent.replace( /\s+/gm, ' ' );

				var m = null;

				m = info.raw.match( /\$(\d+)/ );
				info.rent = m ? parseInt( m[1] ) : null;

				m = info.raw.match( /\s(\d+)br/ );
				info.br = m ? parseInt( m[1] ) : null;

				m = info.raw.match( /\s(\d+)ft/ );
				info.sq_ft = m ? parseInt( m[1] ) : null;

				m = info.raw.match( /\((.+)\)/ );
				info.location = m ? m[1] : null;

				m = info.raw.match( /pic/ );
				info.pic = m ? true : false;

				return info;
			});

			listings.filter( function( info ) {
				return info.location && info.location.indexOf( 'Provo' ) > -1;
			}).forEach( function( l ) {
				console.log( l );
			});
		}
	});
});
