/*
 * @author mrdoob / http://mrdoob.com/
 */

THREE.OBJLoader = function () {

	this._parser = THREE.DDSLoader.parse;

};

THREE.OBJLoader.prototype = Object.create( THREE.CompressedTextureLoader.prototype );
THREE.OBJLoader.prototype.constructor = THREE.OBJLoader;

THREE.OBJLoader.parse = function ( buffer, loadMipmaps ) {

	var obj = { mipmaps: [], width: 0, height: 0, format: null, mipmapCount: 1 };

	var lines = [];
	var x = 0;
	for(;end == true;)
	while(true)
	{
		var c = buffer[x];
		if(c == '\n'

	var header = new Int32Array( buffer, 0, headerLengthInt );
	var fourCC = header[ off_pfFourCC ];

	var isRGBAUncompressed = false;

	switch ( fourCC ) {

		case FOURCC_DXT1:

			blockBytes = 8;
			dds.format = THREE.RGB_S3TC_DXT1_Format;
			break;

		case FOURCC_DXT3:

			blockBytes = 16;
			dds.format = THREE.RGBA_S3TC_DXT3_Format;
			break;

		case FOURCC_DXT5:

			blockBytes = 16;
			dds.format = THREE.RGBA_S3TC_DXT5_Format;
			break;

		case FOURCC_ETC1:

			blockBytes = 8;
			dds.format = THREE.RGB_ETC1_Format;
			break;

		default:

			if ( header[ off_RGBBitCount ] === 32
				&& header[ off_RBitMask ] & 0xff0000
				&& header[ off_GBitMask ] & 0xff00
				&& header[ off_BBitMask ] & 0xff
				&& header[ off_ABitMask ] & 0xff000000  ) {

				isRGBAUncompressed = true;
				blockBytes = 64;
				dds.format = THREE.RGBAFormat;

			} else {

				console.error( 'THREE.DDSLoader.parse: Unsupported FourCC code ', int32ToFourCC( fourCC ) );
				return dds;

			}
	}

	dds.mipmapCount = 1;

	if ( header[ off_flags ] & DDSD_MIPMAPCOUNT && loadMipmaps !== false ) {

		dds.mipmapCount = Math.max( 1, header[ off_mipmapCount ] );

	}

	var caps2 = header[ off_caps2 ];
	dds.isCubemap = caps2 & DDSCAPS2_CUBEMAP ? true : false;
	if ( dds.isCubemap && (
		! ( caps2 & DDSCAPS2_CUBEMAP_POSITIVEX ) ||
		! ( caps2 & DDSCAPS2_CUBEMAP_NEGATIVEX ) ||
		! ( caps2 & DDSCAPS2_CUBEMAP_POSITIVEY ) ||
		! ( caps2 & DDSCAPS2_CUBEMAP_NEGATIVEY ) ||
		! ( caps2 & DDSCAPS2_CUBEMAP_POSITIVEZ ) ||
		! ( caps2 & DDSCAPS2_CUBEMAP_NEGATIVEZ )
		) ) {

		console.error( 'THREE.DDSLoader.parse: Incomplete cubemap faces' );
		return dds;

	}

	dds.width = header[ off_width ];
	dds.height = header[ off_height ];

	var dataOffset = header[ off_size ] + 4;

	// Extract mipmaps buffers

	var faces = dds.isCubemap ? 6 : 1;

	for ( var face = 0; face < faces; face ++ ) {

		var width = dds.width;
		var height = dds.height;

		for ( var i = 0; i < dds.mipmapCount; i ++ ) {

			if ( isRGBAUncompressed ) {

				var byteArray = loadARGBMip( buffer, dataOffset, width, height );
				var dataLength = byteArray.length;

			} else {

				var dataLength = Math.max( 4, width ) / 4 * Math.max( 4, height ) / 4 * blockBytes;
				var byteArray = new Uint8Array( buffer, dataOffset, dataLength );

			}

			var mipmap = { "data": byteArray, "width": width, "height": height };
			dds.mipmaps.push( mipmap );

			dataOffset += dataLength;

			width = Math.max( width >> 1, 1 );
			height = Math.max( height >> 1, 1 );

		}

	}

	return dds;

};