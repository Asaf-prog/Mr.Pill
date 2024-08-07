using Newtonsoft.Json.Linq;
using System.Text;
using MrPill.DTOs.DTOs;
using static MrPill.MOHService.Constants.Constants;

namespace MOHService.service
{
    public class MohApiService : IMohApiService
    {
        private readonly HttpClient _httpClient;

        public MohApiService(IHttpClientFactory httpClientFactory)
        {
            _httpClient = httpClientFactory.CreateClient();
        }

        public async Task<MohPillDetailsDTO> GetPillDetailsAPI(string barcode)
        {
                string apiUrl = MOH_API_URL;
                
                var content = new StringContent(createJsonBodyToMohWithBarcode(barcode), Encoding.UTF8, "application/json");

                HttpResponseMessage response = await _httpClient.PostAsync(apiUrl, content);

                if (response.IsSuccessStatusCode)
                {
                    string pillDetails = await response.Content.ReadAsStringAsync();

                    JToken pillJsonDetails = JArray.Parse(pillDetails)[0];
                    MohPillDetailsDTO dtoToReturn = createPillDetailsDtoFromJson(pillJsonDetails);
                    return dtoToReturn;
                }
                else
                {
                    throw new HttpRequestException($"Failed to post data to the API. Status code: {response.StatusCode}");
                }
        }

        private MohPillDetailsDTO createPillDetailsDtoFromJson(JToken pillJsonDetails)
        {
            return 
                new MohPillDetailsDTO.Builder()
                    .SetBarcode(pillJsonDetails[MOH_JSON_BARCODES_KEY]?.ToString())
                    .SetDrugHebrewName(pillJsonDetails[MOH_JSON_DRAG_HEB_NAME_KEY]?.ToString())
                    .SetDrugEnglishName(pillJsonDetails[MOH_JSON_DRAG_ENG_NAME_KEY]?.ToString())
                    .SetEnglishDescription(pillJsonDetails[MOH_JSON_DRAG_ENG_DESC_KEY]?.ToString())
                    .SetHebrewDescription(pillJsonDetails[MOH_JSON_DRAG_HEB_DESC_KEY]?.ToString())
                    .SetImagePath(MOH_IMAGE_BASE_URL + pillJsonDetails[MOH_JSON_DRAG_IMG_PATH_KEY][0]["url"].ToString())
                    .Build();
                    
        }

        private string createJsonBodyToMohWithBarcode(string barcode)
        {
            string originalJson = @"
                                    {
                                    ""val"": ""5000158100800"",
                                    ""veterinary"": false,
                                    ""cytotoxic"": false,
                                    ""prescription"": false,
                                    ""isGSL"": true,
                                    ""healthServices"": false,
                                    ""isPeopleMedication"": false,
                                    ""fromCanceledDrags"": null,
                                    ""toCanceledDrags"": null,
                                    ""fromUpdateInstructions"": null,
                                    ""toUpdateInstructions"": null,
                                    ""fromNewDrags"": null,
                                    ""toNewDrags"": null,
                                    ""newDragsDrop"": 0,
                                    ""pageIndex"": 1,
                                    ""orderBy"": 0,
                                    ""types"": ""0""
                                    }";


            JObject jsonObject = JObject.Parse(originalJson);
            jsonObject["val"] = barcode;
            return jsonObject.ToString();
        }
    }
}