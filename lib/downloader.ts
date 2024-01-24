import axios from 'axios';


const download = async (id: string) => {
    const options = {
  method: 'GET',
  url: 'https://youtube-video-download-info.p.rapidapi.com/dl',
  params: {id: id},
  headers: {
    'X-RapidAPI-Key': '1cf22ce375msh575ba2175ae2d13p1e662ejsnb36fde3a19d4',
    'X-RapidAPI-Host': 'youtube-video-download-info.p.rapidapi.com'
  }
};
    try {
        const response = await axios.request(options);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
    }

export default download;
