import usePlacesAutocomplete, {getGeocode,getLatLng} from "use-places-autocomplete";
import {
          Combobox,
          ComboboxInput,
          ComboboxPopover,
          ComboboxList,
          ComboboxOption,
        } from "@reach/combobox";
import "@reach/combobox/styles.css";



export default function Search( { panTo }) { //Hakukenttä
    const {
      ready, 
      value, 
      suggestions: {status, data}, 
      setValue, clearSuggestions,}
       = usePlacesAutocomplete({
      requestOptions: {
        location: { lat: () => 60.169857, lng: () => 24.9383 },
        radius: 100 * 10,
       },
      }
    );
  
    console.log(getLatLng)
    return (
      <div className="search">
        <Combobox 
          onSelect={async (address) => {  
          setValue(address, false); 
          clearSuggestions()
          try {
            const results =  await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            panTo({ lat, lng });
              } 
            catch(error) {
              console.log("error")
            }
          }
        }
        >
  
        <ComboboxInput
          class="ComboboxInput"
          style={{color:"white"}}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          disabled={!ready}
          placeholder="Syötä osoite"
        />
  
      <ComboboxPopover>
          <ComboboxList>
            {status === "OK" && 
            data.map(( {id, description }) => 
          (<ComboboxOption key={id} value={description} />))}
         </ComboboxList>
       </ComboboxPopover>
    </Combobox>
    </div>
  
    )
  
   
  }