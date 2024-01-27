import {query} from '@/pages/lib/db'

export default async function handler(req, res) {
  if(req.method === 'GET'){
    const contact = await query({
      query:"SELECT* FROM manage",
      values: [],
    })
    res.status(200).json({ contact : contact});
    
  }

}
