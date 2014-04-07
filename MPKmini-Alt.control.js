loadAPI(1);

host.defineController("Akai", "MPKmini-Alternative", "1.0", "f119d5e0-bac6-11e3-a5e2-0800200c9a66");
// "F0 7E 00 06 02 47 72 00 19 00 01 00 03 00 7F 7F 7F 7F 00 4B 01 00 09 00 09 00 02 03 09 00 08 09 07 02 F7";

host.defineSysexIdentityReply("F0 7E 00 06 02 47 7C 00 19 00 ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? F7");
host.defineMidiPorts(1, 1);
host.addDeviceNameBasedDiscoveryPair(["MPK mini"], ["MPK mini"]);

var CC =
{
	K1 : 13,
	K5 : 17,
	PAD01 : 20,
	PAD02 : 21,
	PAD03 : 22,
	PAD04 : 23,
	PAD05 : 24,
	PAD06 : 25,
	PAD07 : 26,
	PAD08 : 27,
	PAD09 : 28,
	PAD10 : 29,
	PAD11 : 30,
	PAD12 : 31,
	PAD13 : 35,
	PAD14 : 36,
	PAD15 : 37,
	PAD16 : 38
};
var PC =
{
	PAD01 : 0,
	PAD02 : 1,
	PAD03 : 2,
	PAD04 : 3,
	PAD05 : 4,
	PAD06 : 5,
	PAD07 : 6,
	PAD08 : 7,
	PAD09 : 8,
	PAD10 : 9,
	PAD11 : 10,
	PAD12 : 11,
	PAD13 : 12,
	PAD14 : 13,
	PAD15 : 14,
	PAD16 : 15
};

var play = CC.PAD01;
var stop = CC.PAD02;
var rec = CC.PAD03;
var loop = CC.PAD04;
var tap = CC.PAD05;
var od = CC.PAD06;
var cursorTrackUp = CC.PAD07;
var cursorTrackDown = CC.PAD08;

var mapMacro = CC.PAD16;
var devPageUp = 0;
var devPageDown = 0;
var shiftPadsUp = 0;
var shiftPadsDown = 0;
var note = CC.PAD09;
var automation = CC.PAD10;
var mixer = CC.PAD11;
var device = CC.PAD12;
var previousPreset = PC.PAD06;
var nextPreset = PC.PAD02;
var previousPresetCategory = PC.PAD07;
var nextPresetCategory = PC.PAD03;
var previousPresetCreator = PC.PAD08;
var nextPresetCreator = PC.PAD04;
var toggleSoloCursorTrack = PC.PAD01;
var toggleArmCursorTrack = PC.PAD05;

var isMapMacroPressed = false;
var padShift = 0;

var isPlay;

function init()
{
	host.getMidiInPort(0).setMidiCallback(onMidi);
	var keys = host.getMidiInPort(0).createNoteInput("MPKmini Keys", "80????", "90????", "B001??", "B040??", "D0????", "E0????");
    var pads = host.getMidiInPort(0).createNoteInput("MPKmini Pads", "89????", "99????", "D9????", "E9????");
    pads.setShouldConsumeEvents(false);
    var midi_out = host.getMidiOutPort(0);

	// /////////////////////////////////////////////// host sections

	application = host.createApplicationSection();
	transport = host.createTransportSection();
	cursorTrack = host.createCursorTrackSection(2, 0);
	cursorDevice = cursorTrack.getPrimaryInstrument();
	// cursorTrack.getSolo().addValueObserver(function(on)
	// {
 //       println(on ? "SOLO" : "NO SOLO");
	//    midi_out.sendMidi(0xc9, 10, on ? 127 : 0);
	// });

	for ( var p = 0; p < 8; p++)
	{
		var macro = cursorDevice.getMacro(p);
		macro.getAmount().setIndication(true);
	}

	// ////bitwig logo;)
	sendNoteOn(9, 36, 1);
	sendNoteOn(9, 39, 1);
	sendNoteOn(9, 41, 1);
	sendNoteOn(9, 42, 1);

	sendNoteOn(9, 45, 1);
	sendNoteOn(9, 46, 1);
	sendNoteOn(9, 48, 1);
	sendNoteOn(9, 51, 1);

    transport.addIsPlayingObserver(function(isPlaying) {
        midi_out.sendMidi(0xb9, play, isPlaying ? 127 : 0);
    });

    transport.addIsRecordingObserver(function(isRecording) {
        midi_out.sendMidi(0xb9, rec, isRecording ? 127 : 0);
    });

    transport.addOverdubObserver(function(isOvr) {
        midi_out.sendMidi(0xb9, od, isOvr ? 127 : 0);
    });

    transport.addIsLoopActiveObserver(function(isLoop) {
        midi_out.sendMidi(0xb9, loop, isLoop ? 127 : 0);
    });

    transport.addMetronomeTicksObserver(function(isClick) {
        println(isClick);
        // midi_out.sendMidi(0xb9, loop, isLoop ? 127 : 0);
    });

}

function exit()
{
}

function onMidi(status, data1, data2)
{
	var msg = data1;
	var val = data2;
	var buttonPressed = val > 0;
	var CHANNEL0 = 176;
	var CHANNEL10 = 185;
	var NOTE10 = 153;
	var PROGCHANGE = 201;
	var lowerKnobs = msg - CC.K1 + 4;
	var upperKnobs = msg - CC.K1 - 4;

	// printMidi(status, msg, val);

	if (status == CHANNEL10 && msg == mapMacro) isMapMacroPressed = val > 0;

	if (status == CHANNEL0 && msg >= CC.K1 && msg < CC.K1 + 4)
	{
		isMapMacroPressed ? val == 127 ? cursorDevice.getMacro(msg - CC.K1 + 4).getModulationSource().toggleIsMapping() : getEncoderTarget("lower", lowerKnobs, val) : getEncoderTarget("lower", lowerKnobs, val);
	}
	if (status == NOTE10 && msg >= 36 && msg <= 51)
	{
		cursorTrack.playNote(msg + padShift, val);
	}
	else if (status == CHANNEL0 && msg >= CC.K5 && msg < CC.K5 + 4)
	{
		isMapMacroPressed ? val == 127 ? cursorDevice.getMacro(msg - CC.K5).getModulationSource().toggleIsMapping() : getEncoderTarget("upper", upperKnobs, val) : getEncoderTarget("upper", upperKnobs, val);
	}
	else if (status == PROGCHANGE && msg >= PC.PAD01 && msg <= PC.PAD16)
	{
		switch (msg)
		{
			case toggleArmCursorTrack:
				cursorTrack.getArm().toggle();
				break;
			case toggleSoloCursorTrack:
				cursorTrack.getSolo().toggle();
				break;
			case previousPreset:
				cursorDevice.switchToPreviousPreset();
				break;
			case nextPreset:
				cursorDevice.switchToNextPreset();
				break;
			case previousPresetCategory:
				cursorDevice.switchToPreviousPresetCategory();
				break;
			case nextPresetCategory:
				cursorDevice.switchToNextPresetCategory();
				break;
			case previousPresetCreator:
				cursorDevice.switchToPreviousPresetCreator();
				break;
			case nextPresetCreator:
				cursorDevice.switchToNextPresetCreator();
				break;
			case toggleArmCursorTrack + 8:
				cursorTrack.getArm().toggle();
				break;
			case toggleSoloCursorTrack + 8:
				cursorTrack.getSolo().toggle();
				break;
			case previousPreset + 8:
				cursorDevice.switchToPreviousPreset();
				break;
			case nextPreset + 8:
				cursorDevice.switchToNextPreset();
				break;
			case previousPresetCategory + 8:
				cursorDevice.switchToPreviousPresetCategory();
				break;
			case nextPresetCategory + 8:
				cursorDevice.switchToNextPresetCategory();
				break;
			case previousPresetCreator + 8:
				cursorDevice.switchToPreviousPresetCreator();
				break;
			case nextPresetCreator + 8:
				cursorDevice.switchToNextPresetCreator();
				break;
		}
	}
	else if (status == CHANNEL10 && val == 0)
	{
		switch (msg)
		{
			case mapMacro:
				break;
            case play:
                transport.play();
                break;
            case stop:
                transport.stop();
                break;
            case rec:
                transport.record();
                break;
            case loop:
                transport.toggleLoop();
                break;
            case tap:
                var bpm = tapTempo();
                if ( bpm ) {
                    transport.getTempo().set( bpm - 20, 647 );
                }
                break;
			case od:
				transport.toggleOverdub();
				break;
			case note:
				application.toggleNoteEditor();
				break;
			case automation:
				application.toggleAutomationEditor();
				break;
			case mixer:
				application.toggleMixer();
				break;
			case device:
				application.toggleDevices();
				break;
			case shiftPadsUp:
				if (padShift < 88)
				{
					padShift += 8;
				}
				break;
			case shiftPadsDown:
				if (padShift > -40)
				{
					padShift -= 8;
				}
				break;
			case devPageUp:
				cursorDevice.selectPrevious();
				break;
			case devPageDown:
				cursorDevice.selectNext();
				break;
			case cursorTrackUp:
				cursorTrack.selectPrevious();
				break;
			case cursorTrackDown:
				cursorTrack.selectNext();
				break;
		}
	}
}
function onSysex(data)
{
	printSysex(data);
}
function getEncoderTarget(row, knob, val)
{

	if (row == "lower")
	{
		return cursorDevice.getMacro(knob).getAmount().set(val, 128);
	}
	else if (row == "upper")
	{
		return cursorDevice.getMacro(knob).getAmount().set(val, 128);
	}
}
function getObserverIndexFunc(index, f)

{
	return function(value)
	{
		f(index, value);
	};
}

var state = {
        "bpm_tap": {
            "bpm": [],
            "ts": [],
        }
    };

function timestamp() {
    return (new Date()).getTime();
}

function tapTempo() {
        var bpm, bpm_last, bpm_median, bpm_average = 0;
        var ts_now = timestamp();
        var ts_len = state.bpm_tap.ts.length;
        var ts_len_h = parseInt( ts_len/2 );
        var ts_last = state.bpm_tap.ts[ ts_len - 1 ];
        if ( ts_last === undefined || ts_now - ts_last > 1000 ) {
            state.bpm_tap.bpm = [];
            state.bpm_tap.ts = [ ts_now ];
            return false;
        } else {
            bpm = 60000 / ( ts_now - ts_last );
            state.bpm_tap.bpm.push( bpm );
            state.bpm_tap.ts.push( ts_now );
        }
        if ( ts_len > 5 ) {
            bpm_median = Math.round( state.bpm_tap.bpm.sort()[ ts_len_h - 1 ] );
            //bpm_average += state.bpm_tap.bpm[ ts_len_h - 2 ];
            bpm_average += state.bpm_tap.bpm[ ts_len_h - 1 ];
            bpm_average += state.bpm_tap.bpm[ ts_len_h - 0 ];
            bpm_average += state.bpm_tap.bpm[ ts_len_h + 1 ];
            bpm_average = Math.round( bpm_average / 3 );
            return Math.round(( bpm_median + bpm_average ) / 2);
        }
        return false;
    }
